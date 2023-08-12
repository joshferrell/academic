import { style } from '@vanilla-extract/css';
import { sprinkles } from '~/sprinkles/index.css';

export const AssetBox = style([
    sprinkles({
        backgroundColor: 'subtle',
        paddingX: 2,
        paddingY: 2,
        marginY: 2,
        borderRadius: 'md',
        color: 'body',
        display: 'flex',
        gap: 1,
        alignItems: 'center'
    }),
    {
        transition: "all .2s ease-in-out",
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        ":hover": {
            transform: "scale(1.008)",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
    }
])