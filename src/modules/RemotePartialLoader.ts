class RemotePartialLoader {
  url: string;
  selector: string;

  constructor(url: string, selector: string) {
    this.url = url;
    this.selector = selector;
  }

  getPartialHtml(): Promise<string | undefined> {
    return fetch(this.url)
      .then((res) => res.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        // quick fix for weapons, REPLACE
        if (doc.querySelector('table')) return undefined;

        const el = doc.querySelector(this.selector);
        return el?.innerHTML ?? undefined;
      })
      .catch(() => {
        console.warn('Could not GET rules site...');
        return undefined;
      });
  }
}

export default RemotePartialLoader;
