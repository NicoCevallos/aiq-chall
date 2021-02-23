import React, { useCallback, useState } from 'react';
import './App.css';
import { EmailInput, EmailInputItem } from './components/EmailInput/EmailInput';
import { mockedSuggestions } from './mockedSuggestions';

function App() {
  const [values, setValues] = useState<EmailInputItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onEmailInputChange = useCallback((inputValue: string) => {
    setSuggestions(inputValue
      ? mockedSuggestions.filter(s => s.includes(inputValue))
      : []);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <EmailInput
          placeholder="Enter recipients…"
          values={values}
          onChange={onEmailInputChange}
          suggestions={suggestions}
          onInput={setValues}
        />
      </header>
    </div>
  );
}

export default App;
