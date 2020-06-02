type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export const groupByMonth = <T extends { ds: number, y: number | string | null }>(data: AtLeastOne<T>[]): T[] => {
  const byMonth = data.reduce((result: { [key: string]: any }, current) => {
    const date = new Date(current.ds);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (result[`${year}.${month}`]) {
      // Merge all values for same year.month except date
      Object.entries(current).forEach(([key, value]) => {
        if (key === 'y' && result[`${year}.${month}`].y !== null) {
          result[`${year}.${month}`].y += parseFloat(value as string);
        }
        else if (key !== 'ds') result[`${year}.${month}`][key] += value;
      });
    } else {
      result[`${year}.${month}`] = {
        ...current,
        y: !!current.y ? parseFloat(current.y as string) : null
      };
    }
    return result;
  }, {});

  return Object.values(byMonth);
};