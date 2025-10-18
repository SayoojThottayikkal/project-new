import { useState } from "react";
import Tabs from "../components/Tabs";
import UploadArea from "../components/UploadArea";
import TextInput from "../components/TextInput";
import MemberBadge from "../components/MemberBadge";
import { createProject, uploadLogo } from "../services/api";
import { Paperclip } from "lucide-react";
export default function AddProject() {
  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "members", label: "Members" },
    { id: "tasks", label: "Assign Tasks" },
  ];
  const [active, setActive] = useState("basic");

  const [projectName, setProjectName] = useState("");
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("");
  const [projectValue, setProjectValue] = useState("");
  const [totalWorkingHours, setTotalWorkingHours] = useState("");
  const [description, setDescription] = useState("");

  const [teamLeaders, setTeamLeaders] = useState<string[]>(["Hendry"]);
  const [projectManagers, setProjectManagers] = useState<string[]>(["Dwight"]);
  const [tags, setTags] = useState<string[]>(["Dwight"]);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let logoUrl = null;
      if (logoFile) {
        const r = await uploadLogo(logoFile);
        logoUrl = r.data?.url || r.data?.path || null;
      }

      const payload = {
        projectName,
        client,
        startDate,
        endDate,
        priority,
        projectValue,
        totalWorkingHours,
        description,
        logo: logoUrl,
        teamLeaders,
        projectManagers,
        tags,
      };

      await createProject(payload);
      alert("Project created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold">
            Add Project{" "}
            <span className="text-gray-400 text-xs">Project ID : PRO-0004</span>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} active={active} onChange={setActive} />

      {active === "basic" && (
        <div className="space-y-5">
          <UploadArea onFile={(f) => setLogoFile(f)} />

          <TextInput
            label="Project Name"
            value={projectName}
            onChange={setProjectName}
          />

          <TextInput label="Client" value={client} onChange={setClient} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              >
                <option value="">Select</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Project Value
              </label>
              <input
                value={projectValue}
                onChange={(e) => setProjectValue(e.target.value)}
                placeholder="₹"
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Total Working Hours
              </label>
              <input
                value={totalWorkingHours}
                onChange={(e) => setTotalWorkingHours(e.target.value)}
                placeholder="02:05 AM"
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Extra Time
              </label>
              <input
                placeholder="Enter Time"
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-t-md px-2 py-1">
              <select className="border border-gray-300 rounded text-sm px-1 py-0.5 focus:outline-none">
                <option>14</option>
                <option>16</option>
                <option>18</option>
                <option>20</option>
              </select>

              <button
                type="button"
                className="flex items-center gap-1 border border-gray-300 rounded px-2 py-0.5 text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                <Paperclip size={14} />
                Attach File
              </button>
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full border border-gray-200 rounded-b-md p-2 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={() => setActive("members")}
              className="px-4 py-2 bg-sky-500 text-white rounded-md text-sm hover:bg-sky-600"
            >
              Add Team Member
            </button>
          </div>
        </div>
      )}

      {active === "members" && (
        <div className="space-y-4">
          <div>
            <div className="text-sm mb-2">Team Leader</div>
            <div className="border rounded p-3 bg-white">
              {teamLeaders.map((t, i) => (
                <MemberBadge key={i} name={t} />
              ))}

              <button
                onClick={() => setTeamLeaders((p) => [...p, "New Leader"])}
                className="ml-2 text-sky-600 text-sm"
              >
                Add new +
              </button>
            </div>
          </div>

          <div>
            <div className="text-sm mb-2">Project Manager</div>
            <div className="border rounded p-3 bg-white">
              {projectManagers.map((t, i) => (
                <MemberBadge key={i} name={t} />
              ))}
              <button
                onClick={() => setProjectManagers((p) => [...p, "New PM"])}
                className="ml-2 text-sky-600 text-sm"
              >
                Add new +
              </button>
            </div>
          </div>

          <div>
            <div className="text-sm mb-2">Tags</div>
            <div className="border rounded p-3 bg-white">
              {tags.map((t, i) => (
                <MemberBadge key={i} name={t} />
              ))}
              <button
                onClick={() => setTags((p) => [...p, "New Tag"])}
                className="ml-2 text-sky-600 text-sm"
              >
                Add new +
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setActive("basic")}
              className="px-4 py-2 border rounded"
            >
              Back
            </button>
            <button
              onClick={() => setActive("tasks")}
              className="px-4 py-2 bg-sky-500 text-white rounded"
            >
              Create Task
            </button>
          </div>
        </div>
      )}

      {active === "tasks" && (
        <div className="p-6 text-gray-500">
          Assign Tasks UI placeholder (coming soon)
        </div>
      )}

      {active === "tasks" && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {loading ? "Saving..." : "Submit Project"}
          </button>
        </div>
      )}
    </div>
  );
}
