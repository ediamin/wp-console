<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Console;

use Symfony\Component\Console\Exception\InvalidArgumentException;

/**
 * @author Fabien Potencier <fabien@symfony.com>
 */
final class Color
{
    // @wp-console-override
    private const COLORS = [
        'black' => '<span class="wp-console-color-black">',
        'red' => '<span class="wp-console-color-red">',
        'green' => '<span class="wp-console-color-green">',
        'yellow' => '<span class="wp-console-color-yellow">',
        'blue' => '<span class="wp-console-color-blue">',
        'magenta' => '<span class="wp-console-color-magenta">',
        'cyan' => '<span class="wp-console-color-cyan">',
        'white' => '<span class="wp-console-color-white">',
        'default' => '<span class="wp-console-color-default">',
    ];

    // @wp-console-override
    private const BRIGHT_COLORS = [
        'gray' => '<span class="wp-console-color-gray">',
        'bright-red' => '<span class="wp-console-color-bright-red">',
        'bright-green' => '<span class="wp-console-color-bright-green">',
        'bright-yellow' => '<span class="wp-console-color-bright-yellow">',
        'bright-blue' => '<span class="wp-console-color-bright-blue">',
        'bright-magenta' => '<span class="wp-console-color-bright-magenta">',
        'bright-cyan' => '<span class="wp-console-color-bright-cyan">',
        'bright-white' => '<span class="wp-console-color-bright-white">',
    ];

    // @wp-console-override
    private const AVAILABLE_OPTIONS = [
        'bold' => [ 'set' => '<span class="wp-console-color-bold">', 'unset' => '</span>' ],
        'underscore' => [ 'set' => '<span class="wp-console-color-underscore">', 'unset' => '</span>' ],
        'blink' => [ 'set' => '<span class="wp-console-color-blink">', 'unset' => '</span>' ],
        'reverse' => [ 'set' => '<span class="wp-console-color-reverse">', 'unset' => '</span>' ],
        'conceal' => [ 'set' => '<span class="wp-console-color-conceal">', 'unset' => '</span>' ],
    ];

    private $foreground;
    private $background;
    private $options = [];

    public function __construct(string $foreground = '', string $background = '', array $options = [])
    {
        $this->foreground = $this->parseColor($foreground);
        $this->background = $this->parseColor($background, true);

        foreach ($options as $option) {
            if (!isset(self::AVAILABLE_OPTIONS[$option])) {
                throw new InvalidArgumentException(sprintf('Invalid option specified: "%s". Expected one of (%s).', $option, implode(', ', array_keys(self::AVAILABLE_OPTIONS))));
            }

            $this->options[$option] = self::AVAILABLE_OPTIONS[$option];
        }
    }

    public function apply(string $text): string
    {
        return $this->set().$text.$this->unset();
    }

    public function set(): string
    {
        $setCodes = [];
        if ('' !== $this->foreground) {
            $setCodes[] = $this->foreground;
        }
        if ('' !== $this->background) {
            $setCodes[] = $this->background;
        }
        foreach ($this->options as $option) {
            $setCodes[] = $option['set'];
        }
        if (0 === \count($setCodes)) {
            return '';
        }

        // @wp-console-override
        return implode( '', $setCodes );
    }

    public function unset(): string
    {
        $unsetCodes = [];
        if ('' !== $this->foreground) {
            // @wp-console-override
            $unsetCodes[] = '</span>';
        }
        if ('' !== $this->background) {
            // @wp-console-override
            $unsetCodes[] = '</span>';
        }
        foreach ($this->options as $option) {
            $unsetCodes[] = $option['unset'];
        }
        if (0 === \count($unsetCodes)) {
            return '';
        }

        // @wp-console-override
        return implode( '', $unsetCodes );
    }

    private function parseColor(string $color, bool $background = false): string
    {
        if ('' === $color) {
            return '';
        }

        if ('#' === $color[0]) {
            $color = substr($color, 1);

            if (3 === \strlen($color)) {
                $color = $color[0].$color[0].$color[1].$color[1].$color[2].$color[2];
            }

            if (6 !== \strlen($color)) {
                throw new InvalidArgumentException(sprintf('Invalid "%s" color.', $color));
            }

            // @wp-console-override
            return $this->convertHexColorToAnsi(hexdec($color));
        }

        if (isset(self::COLORS[$color])) {
            // @wp-console-override
            return self::COLORS[$color];
        }

        if (isset(self::BRIGHT_COLORS[$color])) {
            // @wp-console-override
            return self::BRIGHT_COLORS[$color];
        }

        throw new InvalidArgumentException(sprintf('Invalid "%s" color; expected one of (%s).', $color, implode(', ', array_merge(array_keys(self::COLORS), array_keys(self::BRIGHT_COLORS)))));
    }

    private function convertHexColorToAnsi(int $color): string
    {
        $r = ($color >> 16) & 255;
        $g = ($color >> 8) & 255;
        $b = $color & 255;

        // see https://github.com/termstandard/colors/ for more information about true color support
        if ('truecolor' !== getenv('COLORTERM')) {
            return (string) $this->degradeHexColorToAnsi($r, $g, $b);
        }

        return sprintf('8;2;%d;%d;%d', $r, $g, $b);
    }

    private function degradeHexColorToAnsi(int $r, int $g, int $b): int
    {
        if (0 === round($this->getSaturation($r, $g, $b) / 50)) {
            return 0;
        }

        return (round($b / 255) << 2) | (round($g / 255) << 1) | round($r / 255);
    }

    private function getSaturation(int $r, int $g, int $b): int
    {
        $r = $r / 255;
        $g = $g / 255;
        $b = $b / 255;
        $v = max($r, $g, $b);

        if (0 === $diff = $v - min($r, $g, $b)) {
            return 0;
        }

        return (int) $diff * 100 / $v;
    }
}
