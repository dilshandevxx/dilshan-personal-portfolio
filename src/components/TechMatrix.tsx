import React from "react";
import { skillCategories } from "@/data/skills";
import { Cpu, Code2, Cloud, Database } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "AI & Machine Learning Engineering": Cpu,
  "Full-Stack Web Development": Code2,
  "DevOps & Cloud Infrastructure": Cloud,
  "Data & Systems Architecture": Database,
};

export function TechMatrix() {
  return (
    <div className="tech-matrix-grid">
      {skillCategories.map((group) => {
        const IconComponent = CATEGORY_ICONS[group.category] || Code2;

        return (
          <div key={group.category} className="tech-group">
            <div className="tech-group-header">
              <IconComponent size={16} className="tech-group-icon" />
              <h3 className="tech-group-title">{group.category}</h3>
            </div>
            <p className="tech-group-desc">{group.description}</p>
            <div className="tech-tag-list">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`tech-tag ${skill.highlight ? "highlight" : ""}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

