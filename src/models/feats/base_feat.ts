export abstract class BaseFeat {
  abstract name: string;
  abstract description: string;
  abstract hyperlink?: string;

  abstract requirementsMet(): boolean;
}
