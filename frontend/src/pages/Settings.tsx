import React, { useState } from "react";

interface Integration {
  name: string;
  status: string;
}

const Settings: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { name: "WIPO", status: "Connected" },
    { name: "IEEE Xplore", status: "Connected" },
    { name: "ArXiv", status: "Disconnected" },
  ]);

  const [expandedIntegration, setExpandedIntegration] = useState<string | null>(null);
  const [defaultLLM, setDefaultLLM] = useState("OpenAI - gpt-4o-mini");

  const toggleIntegration = (name: string) => {
    setExpandedIntegration(expandedIntegration === name ? null : name);
  };

  const toggleStatus = (name: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.name === name
          ? { ...i, status: i.status === "Connected" ? "Disconnected" : "Connected" }
          : i
      )
    );
  };

  return (
    <div className="space-y-8 px-4 md:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage connectors, user preferences, and model settings.</p>
      </div>

      {/* Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="font-semibold text-white text-lg">Integrations</h3>
          <p className="text-gray-400 text-sm mt-2">Add API keys and configure source sync schedules.</p>

          <div className="mt-4 space-y-3">
            {integrations.map((integration) => (
              <div key={integration.name} className="border border-gray-700 rounded p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{integration.name}</p>
                    <p className={`text-xs ${integration.status === "Connected" ? "text-green-400" : "text-red-400"}`}>
                      Status: {integration.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleIntegration(integration.name)}
                      className="px-3 py-1 text-sm rounded bg-gray-800 text-white"
                    >
                      {expandedIntegration === integration.name ? "Hide" : "Manage"}
                    </button>
                    <button
                      onClick={() => toggleStatus(integration.name)}
                      className="px-3 py-1 text-sm rounded bg-indigo-500 text-white"
                    >
                      {integration.status === "Connected" ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </div>

                {expandedIntegration === integration.name && (
                  <div className="mt-2 text-gray-400 text-sm">
                    <p>API Key: *************</p>
                    <p>Last Sync: 2025-10-06</p>
                    <p>Next Scheduled Sync: 2025-10-07</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Model / LLM Settings */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="font-semibold text-white text-lg">Model / LLM Settings</h3>
          <p className="text-gray-400 text-sm mt-2">
            Configure default LLM, prompt templates, and API keys.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Default LLM</label>
              <select
                value={defaultLLM}
                onChange={(e) => setDefaultLLM(e.target.value)}
                className="w-full bg-gray-800 rounded px-3 py-2 text-white"
              >
                <option>OpenAI - gpt-4o-mini</option>
                <option>Local LLM - Llama2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Prompt Template</label>
              <textarea
                className="w-full bg-gray-800 rounded px-3 py-2 text-white"
                rows={4}
                placeholder="Enter default prompt template..."
              />
            </div>

            <div>
              <button
                onClick={() => alert("Settings saved successfully!")}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md font-medium"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
