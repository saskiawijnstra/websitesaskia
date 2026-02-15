import { computed } from "vue";

export function useGridWidthFromYaml(
  blockData: Partial<{ content: { width: string } }>,
  defaultWidth = "col-span-12",
) {
  const columnsClass = computed(() => {
    let className = defaultWidth; // fallback
    switch (blockData.content?.width) {
      case "grid-12":
        className = "col-span-12-start-1";
        break;
      case "grid-11":
        className = "col-span-11-start-1";
        break;
      case "grid-10":
        className = "col-span-10-start-2";
        break;
      case "grid-9":
        className = "col-span-9-start-2";
        break;
      case "grid-8":
        className = "col-span-8-start-3";
        break;
      case "grid-7":
        className = "col-span-7-start-3";
        break;
      case "grid-6":
        className = "col-span-6-start-4";
        break;
      case "grid-5":
        className = "col-span-5-start-4";
        break;
      case "grid-4":
        className = "col-span-4-start-5";
        break;
      case "grid-3":
        className = "col-span-3-start-5";
        break;
      case "grid-2":
        className = "col-span-2-start-6";
        break;
      case "grid-1":
        className = "col-span-1-start-6";
        break;
      case "full":
        className = "full";
        break;
      default:
        className = defaultWidth;
    }
    return className;
  });

  return { columnsClass };
}
