

// АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ
// абвгдеёжзийклмнопрстуфхцчшщъыьэюя
export const ALPHABET_RUSSIAN: string = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
export const ALPHABET_RUSSIAN_WITH_CAPITALS: string = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

// abcdefghijklmnopqrstuvwxyz
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
export const ALPHABET_ENGLISH: string = 'abcdefghijklmnopqrstuvwxyz';
export const ALPHABET_ENGLISH_WITH_CAPITALS: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const NUMBER_SUBSCRIPT: Map<number, string> = new Map([
  [0, '₀'],
  [1, '₁'],
  [2, '₂'],
  [3, '₃'],
  [4, '₄'],
  [5, '₅'],
  [6, '₆'],
  [7, '₇'],
  [8, '₈'],
  [9, '₉'],
]);


export const NUMBER_SUPERSCRIPT: Map<number, string> = new Map([
  [0, '⁰'],
  [1, '¹'],
  [2, '²'],
  [3, '³'],
  [4, '⁴'],
  [5, '⁵'],
  [6, '⁶'],
  [7, '⁷'],
  [8, '⁸'],
  [9, '⁹'],
]);


// Frequency of letters in the Russain alphabet (in percent)
export const ALPHABET_FREQUENCY_RUSSIAN = new Map([
  ['о', 10.983],
  ['е', 8.483],
  ['а', 7.998],
  ['и', 7.367],
  ['н', 6.7],
  ['т', 6.318],
  ['с', 5.473],
  ['р', 4.746],
  ['в', 4.533],
  ['л', 4.343],
  ['к', 3.486],
  ['м', 3.203],
  ['д', 2.977],
  ['п', 2.804],
  ['у', 2.615],
  ['я', 2.001],
  ['ы', 1.898],
  ['ь', 1.735],
  ['г', 1.687],
  ['з', 1.641],
  ['б', 1.592],
  ['ч', 1.45],
  ['й', 1.208],
  ['х', 0.966],
  ['ж', 0.94],
  ['ш', 0.718],
  ['ю', 0.638],
  ['ц', 0.486],
  ['щ', 0.361],
  ['э', 0.331],
  ['ф', 0.267],
  ['ъ', 0.037],
  ['ё', 0.013],
]);


// Frequency of letters in the English alphabet (in percent)
export const ALPHABET_FREQUENCY_ENGLISH = new Map([
  ['a', 8.167],
  ['b', 1.492],
  ['c', 2.782],
  ['d', 4.253],
  ['e', 12.702],
  ['f', 2.228],
  ['g', 2.015],
  ['h', 6.094],
  ['i', 6.966],
  ['j', 0.153],
  ['k', 0.772],
  ['l', 4.025],
  ['m', 2.406],
  ['n', 6.749],
  ['o', 7.507],
  ['p', 1.929],
  ['q', 0.095],
  ['r', 5.987],
  ['s', 6.327],
  ['t', 9.056],
  ['u', 2.758],
  ['v', 0.978],
  ['w', 2.360],
  ['x', 0.150],
  ['y', 1.974],
  ['z', 0.074],
]);
