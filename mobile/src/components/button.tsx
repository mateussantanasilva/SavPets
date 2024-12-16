import { forwardRef } from 'react'
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native'
import { tv, VariantProps } from 'tailwind-variants'
import colors from 'tailwindcss/colors'

const button = tv({
  base: 'flex-row items-center justify-center rounded-md',
  variants: {
    isFloat: {
      true: 'h-14 w-14',
      false: 'h-[50]',
    },
    variant: {
      default: 'bg-sky-400',
      delete: 'bg-rose-400',
      outline: 'bg-transparent border border-slate-300',
      'outline-delete': 'bg-transparent border border-rose-400',
      ghost: 'bg-transparent',
    },
  },
  defaultVariants: {
    isFloat: false,
    variant: 'default',
  },
})

type RootProps = TouchableOpacityProps & VariantProps<typeof button>

const Root = forwardRef<TouchableOpacity, RootProps>(function Root(
  { isFloat, variant, className, ...props },
  ref,
) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      ref={ref}
      style={{ gap: 12 }}
      className={button({ variant, isFloat, className })}
      {...props}
    >
      {props.disabled ? (
        <ActivityIndicator color={colors.slate[950]} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  )
})

function Title(props: TextProps) {
  return (
    <Text
      className="text-center text-sm font-bold leading-short text-slate-950"
      {...props}
    />
  )
}

function Icon(props: ViewProps) {
  return <View {...props} />
}

/* usando o princípio da composição selecionando apenas os itens que serão usados - ícone | texto */
export { Root, Title, Icon }
