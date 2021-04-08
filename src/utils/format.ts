export const formatNumberString = (num: number) => {
  const symbols = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'K' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'G' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'P' },
    { value: 1E18, symbol: 'E' }
  ];
  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const absNum = Math.abs(num);

  let i;
  for (i = symbols.length - 1; i > 0; i--) {
    if (absNum >= symbols[i].value) {
      break;
    }
  }
  return (num / symbols[i].value).toFixed(2).replace(regex, "$1") + symbols[i].symbol;
};

export const mapFormArrayValues = <T>(array: any[]) => array.map(item => item.value ?? item) as T[];

export const getInitials = (name: string) => name.replace(/(\b[a-zA-Z])[a-zA-Z]* ?/g, '$1');

export const formatCurrency = (value?: number | string) => {
  if (!value) return '';
  let num = typeof value === 'string' ? parseFloat(value) : value;
  return num.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' }).replace(/\.0*$/, '');
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}