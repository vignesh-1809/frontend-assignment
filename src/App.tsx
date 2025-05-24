import React, { useState } from 'react';
import Typography from './components/typography/Typography';
import TextInput from './components/inputs/TextInput';
import Dropdown from './components/inputs/Dropdown';
import Toast from './components/feedback/Toast';
import Alert from './components/feedback/Alert';
import { Mail, User, Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
  };
  
  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'Standard User' },
    { value: 'guest', label: 'Guest' },
    { value: 'editor', label: 'Content Editor' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="mx-auto max-w-4xl p-6">
        <div className="flex items-center justify-between pb-8">
          <Typography variant="h2" color="primary">Design System</Typography>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="mb-12">
          <Typography variant="h3" className="mb-6">Typography System</Typography>
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">Body 1 - Main content text style</Typography>
            <Typography variant="body2">Body 2 - Secondary content text style</Typography>
            <Typography variant="caption">Caption text for small labels</Typography>
            <Typography variant="overline">OVERLINE TEXT FOR LABELS</Typography>
            <Typography variant="helper">Helper text provides additional context</Typography>
          </div>
        </div>
        
        <div className="mb-12">
          <Typography variant="h3" className="mb-6">Form Components</Typography>
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput
                label="Name"
                placeholder="Enter your name"
                leftIcon={<User size={16} />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                required
              />
              
              <TextInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                leftIcon={<Mail size={16} />}
                helperText="We'll never share your email."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                required
              />
              
              <Dropdown
                label="Role"
                placeholder="Select your role"
                options={roleOptions}
                value={role}
                onChange={setRole}
                clearable
                id="role"
                required
              />
              
              <div>
                <button
                  type="submit"
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mb-12">
          <Typography variant="h3" className="mb-6">Feedback Components</Typography>
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
            <div className="space-y-4">
              <Typography variant="h4">Alerts</Typography>
              <Alert
                variant="info"
                title="Information"
                description="This is an informational message."
              />
              <Alert
                variant="success"
                title="Success"
                description="Operation completed successfully."
              />
              <Alert
                variant="warning"
                title="Warning"
                description="This action might have consequences."
              />
              <Alert
                variant="error"
                title="Error"
                description="An error occurred while processing your request."
                dismissible
              />
            </div>
            
            <div className="space-y-4">
              <Typography variant="h4">Toasts</Typography>
              <div className="flex flex-wrap gap-2">
                <button
                  className="rounded bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
                  onClick={() => setShowToast(true)}
                >
                  Show Toast
                </button>
              </div>
              {showToast && (
                <div className="mt-4">
                  <Toast
                    variant="success"
                    title="Success"
                    description="Form submitted successfully!"
                    onClose={() => setShowToast(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;