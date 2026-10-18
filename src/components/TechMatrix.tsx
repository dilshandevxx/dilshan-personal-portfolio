import React from "react";
import { skillCategories } from "@/data/skills";

export function TechMatrix() {
  return (
    <div className="tech-matrix">
      {skillCategories.map((group) => (
        <div key={group.category} className="tech-category-card">
          <h3 className="tech-category-title">{group.category}</h3>
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
      ))}
    </div>
  );
}
