declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.module.scss' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}

export interface CSSModuleClasses {
  [className: string]: string;
}
