export const MatchAny = Symbol('MatchAny');

type MatchArg<T> = [T, () => void];

const Match = <T>(valueToMatch: T, ...args: MatchArg<T>[]) => {
  args.forEach(([value, action]) => {
    if (value === valueToMatch || value === MatchAny) {
      action();
      return; 
    }
  });
  return undefined;
};

export default Match;
