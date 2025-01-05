export const paymentHeader = (key: string) => {
  return {
    headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
  };
};
