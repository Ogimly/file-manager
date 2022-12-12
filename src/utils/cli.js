export const getUsername = () => {
  let result = process.argv.find((arg) => arg.includes('--username'));
  if (result) result = result.slice(11);
  return result;
};
