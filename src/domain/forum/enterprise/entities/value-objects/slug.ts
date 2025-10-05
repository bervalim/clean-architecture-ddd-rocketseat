export class Slug {
    public value: string

    constructor(value: string){
        this.value = value
    }

    /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */

    static createFromText(text: string){
      // PADRONIZA NOSSA STRING CONVERTENDO NOSSA STRING PARA UM CARACTER QUE POSSA
      //  SER ACEITO
      // TRIM -> remove qualquer espaçamento extra para direita ou esq
      // s -> white space , g- global -> Irá substituir todos os espaços em branco
      // Segundo regex -> Remove palavras e não palavras como acentos,etc e substuitui
    //   susbstitui _ por hífen

      const slugText = text
        .normalize("NFKD")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/_/g, '-')
        .replace(/--+/g, '-')
        .replace(/-$/g, '');

        return new Slug(slugText)
    }
}