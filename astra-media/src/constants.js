import { HomeIcon, PencilIcon, PlusIcon, BookOpenIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/outline'

export const PAGE_MAIN = 'main'
export const PAGE_REDACT = 'redact'
export const PAGE_CREATE = 'create'
export const PAGE_LIBRARY = 'library'
export const PAGE_LOGIN = 'login'

// Объявляем навигационные иконки
export const NAV_ITEMS = {
    [PAGE_MAIN]: HomeIcon,
    [PAGE_REDACT]: PencilIcon,
    [PAGE_CREATE]: PlusIcon,
    [PAGE_LIBRARY]: BookOpenIcon,
    [PAGE_LOGIN]: ArrowRightEndOnRectangleIcon
}

// цвет подсветки
export const COLORS = {
    keyword1: '#ff79c6',
    keyword2: '#8be9fd',
    keyword3: '#e7f092',
    number: '#bd93f9',
    string: '#f1fa8c',
    variable: '#ff5555'
  };
  
  