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
    <div className="tech-matrix">
      {skillCategories.map((group, idx) => {
        const IconComponent = CATEGORY_ICONS[group.category] || Code2;
        const indexStr = String(idx + 1).padStart(2, "0");

        return (
          <div key={group.category} className="tech-category-card">
            <div className="tech-category-header">
              <div className="tech-category-header-left">
                <IconComponent size={15} className="tech-category-icon" />
                <span className="tech-category-index">{indexStr} //</span>
                <h3 className="tech-category-title">{group.category}</h3>
              </div>
              <span className="tech-category-count">{group.skills.length} skills</span>
            </div>
            <p className="tech-category-desc">{group.description}</p>
            <div className="tech-pill-list">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`tech-pill ${skill.highlight ? "highlight" : ""}`}
                  title={`Proficiency: ${skill.level}`}
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
