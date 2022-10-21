export enum SkillsCategory {
  programmingLanguages = 'programmingLanguages',
  webTechnologies = 'webTechnologies',
  applicationServers = 'applicationServers',
  databases = 'databases',
  otherSkills = 'otherSkills',
}

export interface ISkillItem {
  environment_id: string;
  label: string;
  category: SkillsCategory;
  priority: number;
}

export interface IEnvironments {
  categoryName: string;
  skills: string[];
}
