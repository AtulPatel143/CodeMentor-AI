declare module "swagger-jsdoc" {
  function swaggerJSDoc(options: swaggerJSDoc.Options): any;

  namespace swaggerJSDoc {
    export interface Options {
      definition: Record<string, unknown>;
      apis: string[];
    }
  }

  export default swaggerJSDoc;
}
