export function useMarkdownParser() {
  /**
   * replaces markdown style asterisks with html strong tags in supplied text string
   * @param text
   */
  function formatText(text: string): string {
    return (
      text
        // ***bold and italic***
        .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
        // **bold**
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // *italic*
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
    );
  }

  return {
    formatText,
  };
}
