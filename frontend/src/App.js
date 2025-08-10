import { IntegrationForm } from './integration-form';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text">
            Data Integration Hub
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect and manage your data sources with elegant simplicity
          </p>
        </div>
        <IntegrationForm />
      </div>
    </div>
  );
}

export default App;
