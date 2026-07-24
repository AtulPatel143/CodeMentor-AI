import { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjects } from "../../../services/project.service";

type Project = {
  id: string;
  title: string;
};

const RecentProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.projects);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchProjects();
  }, []);

  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Recent Projects
      </h3>

      <div className="space-y-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
              id === project.id
                ? "bg-cyan-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FolderOpen size={18} />
            <span className="truncate">{project.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
