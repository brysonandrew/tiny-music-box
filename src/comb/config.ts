export type TMidiConfig = {
  from: number;
  total: number;
};
export const resolveMidis = ({
  from,
  total,
}: TMidiConfig) =>
  [...Array(total)].map(
    (_, index: number) => index + from
  );
