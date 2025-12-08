// global.d.ts — декларации для CSS импортов
declare module '*.css' {
  const content: string;
  export default content;
}