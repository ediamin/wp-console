<?php

namespace WPConsole\Core\Console\Psy\Output;

use Symfony\Component\Console\Exception\InvalidArgumentException;
use Symfony\Component\Console\Formatter\OutputFormatterStyle as SymfonyOutputFormatterStyle;

/**
 * Override version of Symphony OutputFormatterStyle
 * Everything is except:
 * 1) The available static properties
 * 2) The return statement of apply method
 * 3) The coding style
 */
class OutputFormatterStyle extends SymfonyOutputFormatterStyle {
    private static $availableForegroundColors = [
        'black' => [ 'set' => '<span class="wp-console-color-black">', 'unset' => '</span>' ],
        'red' => [ 'set' => '<span class="wp-console-color-red">', 'unset' => '</span>' ],
        'green' => [ 'set' => '<span class="wp-console-color-green">', 'unset' => '</span>' ],
        'yellow' => [ 'set' => '<span class="wp-console-color-yellow">', 'unset' => '</span>' ],
        'blue' => [ 'set' => '<span class="wp-console-color-blue">', 'unset' => '</span>' ],
        'magenta' => [ 'set' => '<span class="wp-console-color-magenta">', 'unset' => '</span>' ],
        'cyan' => [ 'set' => '<span class="wp-console-color-cyan">', 'unset' => '</span>' ],
        'white' => [ 'set' => '<span class="wp-console-color-white">', 'unset' => '</span>' ],
        'default' => [ 'set' => '<span class="wp-console-color-default">', 'unset' => '</span>' ],
    ];

    private static $availableBackgroundColors = [
        'black' => [ 'set' => '<span class="wp-console-color-black-bg">', 'unset' => '</span>' ],
        'red' => [ 'set' => '<span class="wp-console-color-red-bg">', 'unset' => '</span>' ],
        'green' => [ 'set' => '<span class="wp-console-color-green-bg">', 'unset' => '</span>' ],
        'yellow' => [ 'set' => '<span class="wp-console-color-yellow-bg">', 'unset' => '</span>' ],
        'blue' => [ 'set' => '<span class="wp-console-color-blue-bg">', 'unset' => '</span>' ],
        'magenta' => [ 'set' => '<span class="wp-console-color-magenta-bg">', 'unset' => '</span>' ],
        'cyan' => [ 'set' => '<span class="wp-console-color-cyan-bg">', 'unset' => '</span>' ],
        'white' => [ 'set' => '<span class="wp-console-color-white-bg">', 'unset' => '</span>' ],
        'default' => [ 'set' => '<span class="wp-console-color-default-bg">', 'unset' => '</span>' ],
    ];

    private static $availableOptions = [
        'bold' => [ 'set' => '<span class="wp-console-color-bold">', 'unset' => '</span>' ],
        'underscore' => [ 'set' => '<span class="wp-console-color-underscore">', 'unset' => '</span>' ],
        'blink' => [ 'set' => '<span class="wp-console-color-blink">', 'unset' => '</span>' ],
        'reverse' => [ 'set' => '<span class="wp-console-color-reverse">', 'unset' => '</span>' ],
        'conceal' => [ 'set' => '<span class="wp-console-color-conceal">', 'unset' => '</span>' ],
    ];

    private $foreground;
    private $background;
    private $options = [];

    /**
     * Initializes output formatter style.
     *
     * @param string|null $foreground The style foreground color name
     * @param string|null $background The style background color name
     * @param array       $options    The style options
     */
    public function __construct( $foreground = null, $background = null, $options = [] ) {
        if ( null !== $foreground ) {
            $this->setForeground( $foreground );
        }

        if ( null !== $background ) {
            $this->setBackground( $background );
        }

        if ( \count( $options ) ) {
            $this->setOptions( $options );
        }
    }

    /**
     * Sets style foreground color.
     *
     * @since 1.0.0
     *
     * @param string|null $color The color name
     *
     * @throws InvalidArgumentException When the color name isn't defined
     *
     * @return void
     */
    public function setForeground( $color = null ) {
        if (null === $color) {
            $this->foreground = null;

            return;
        }

        if (!isset(static::$availableForegroundColors[$color])) {
            throw new InvalidArgumentException(sprintf('Invalid foreground color specified: "%s". Expected one of (%s)', $color, implode(', ', array_keys(static::$availableForegroundColors))));
        }

        $this->foreground = static::$availableForegroundColors[$color];
    }

    /**
     * Sets style background color.
     *
     * @param string|null $color The color name
     *
     * @throws InvalidArgumentException When the color name isn't defined
     */
    public function setBackground( $color = null ) {
        if ( null === $color ) {
            $this->background = null;

            return;
        }

        if ( ! isset( static::$availableBackgroundColors[ $color ] ) ) {
            throw new InvalidArgumentException( sprintf( 'Invalid background color specified: "%s". Expected one of (%s)', $color, implode( ', ', array_keys( static::$availableBackgroundColors ) ) ) );
        }

        $this->background = static::$availableBackgroundColors[ $color ];
    }

    /**
     * Sets some specific style option.
     *
     * @since 1.0.0
     *
     * @param string $option The option name
     *
     * @throws InvalidArgumentException When the option name isn't defined
     *
     * @return void
     */
    public function setOption( $option ) {
        if ( ! isset( static::$availableOptions[ $option ] ) ) {
            throw new InvalidArgumentException( sprintf( 'Invalid option specified: "%s". Expected one of (%s)', $option, implode( ', ', array_keys( static::$availableOptions ) ) ) );
        }

        if ( ! \in_array( static::$availableOptions[ $option ], $this->options ) ) {
            $this->options[] = static::$availableOptions[ $option ];
        }
    }

    /**
     * Unsets some specific style option.
     *
     * @since 1.0.0
     *
     * @param string $option The option name
     *
     * @throws InvalidArgumentException When the option name isn't defined
     *
     * @return void
     */
    public function unsetOption( $option ) {
        if ( ! isset( static::$availableOptions[ $option ] ) ) {
            throw new InvalidArgumentException( sprintf( 'Invalid option specified: "%s". Expected one of (%s)', $option, implode( ', ', array_keys( static::$availableOptions ) ) ) );
        }

        $pos = array_search( static::$availableOptions[ $option ], $this->options );
        if ( false !== $pos ) {
            unset( $this->options[ $pos ] );
        }
    }

    /**
     * Sets multiple style options at once.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function setOptions( array $options ) {
        $this->options = [];

        foreach ( $options as $option ) {
            $this->setOption( $option );
        }
    }

    /**
     * Applies the style to a given text.
     *
     * @since 1.0.0
     *
     * @param string $text The text to style
     *
     * @return string
     */
    public function apply( $text ) {
        $setCodes   = [];
        $unsetCodes = [];

        if ( null !== $this->foreground ) {
            $setCodes[]   = $this->foreground['set'];
            $unsetCodes[] = $this->foreground['unset'];
        }

        if ( null !== $this->background ) {
            $setCodes[]   = $this->background['set'];
            $unsetCodes[] = $this->background['unset'];
        }

        if ( \count( $this->options ) ) {
            foreach ( $this->options as $option ) {
                $setCodes[]   = $option['set'];
                $unsetCodes[] = $option['unset'];
            }
        }

        if ( 0 === \count( $setCodes ) ) {
            return $text;
        }

        return sprintf( '%s%s%s', implode( '', $setCodes ), $text, implode( '', $unsetCodes ) );
    }
}
