<?php

namespace WPConsole\Core\Console\Psy\Output;

use Psy\Output\OutputPager;
use Psy\Output\PassthruPager;
use Psy\Output\ProcOutputPager;
use Psy\Output\ShellOutput as PsyShellOutput;
use Symfony\Component\Console\Formatter\OutputFormatterInterface;
use Symfony\Component\Console\Output\ConsoleOutput;
use WPConsole\Core\Console\Psy\Output\OutputFormatterStyle;

class ShellOutput extends PsyShellOutput {

    /**
     * Output message
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $outputMessage = null;

    /**
     * Holds exceptions
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var null|\Exception
     */
    public $exception = null;

    /**
     * Construct a ShellOutput instance.
     *
     * @since 1.0.0
     *
     * @param mixed                    $verbosity (default: self::VERBOSITY_NORMAL)
     * @param bool                     $decorated (default: null)
     * @param OutputFormatterInterface $formatter (default: null)
     * @param null|string|OutputPager  $pager     (default: null)
     *
     * @return void
     */
    public function __construct( $verbosity = self::VERBOSITY_NORMAL, $decorated = null, OutputFormatterInterface $formatter = null, $pager = null ) {
        ConsoleOutput::__construct( $verbosity, $decorated, $formatter );

        $this->initFormatters();

        if ( $pager === null ) {
            $this->pager = new PassthruPager( $this );
        } elseif (\is_string($pager)) {
            $this->pager = new ProcOutputPager( $this, $pager );
        } elseif ( $pager instanceof OutputPager ) {
            $this->pager = $pager;
        } else {
            throw new \InvalidArgumentException( 'Unexpected pager parameter: ' . $pager );
        }
    }

    /**
     * Writes a message to the output.
     *
     * @since 1.0.0
     *
     * @param string $message A message to write to the output
     * @param bool   $newline Whether to add a newline or not
     *
     * @return void
     */
    public function doWrite( $message, $newline ) {
        $this->outputMessage .= $message;
    }

    /**
     * Initialize output formatter styles.
     *
     * @since 1.0.0
     *
     * @return void
     */
    protected function initFormatters() {
        $formatter = $this->getFormatter();

        $formatter->setStyle( 'warning', new OutputFormatterStyle( 'black', 'yellow' ) );
        $formatter->setStyle( 'error',   new OutputFormatterStyle( 'black', 'red', ['bold'] ) );
        $formatter->setStyle( 'aside',   new OutputFormatterStyle( 'blue' ) );
        $formatter->setStyle( 'strong',  new OutputFormatterStyle( null, null, ['bold'] ) );
        $formatter->setStyle( 'return',  new OutputFormatterStyle( 'cyan' ) );
        $formatter->setStyle( 'urgent',  new OutputFormatterStyle( 'red' ) );
        $formatter->setStyle( 'hidden',  new OutputFormatterStyle( 'black' ) );

        // Visibility
        $formatter->setStyle( 'public',    new OutputFormatterStyle( null, null, ['bold'] ) );
        $formatter->setStyle( 'protected', new OutputFormatterStyle( 'yellow' ) );
        $formatter->setStyle( 'private',   new OutputFormatterStyle( 'red' ) );
        $formatter->setStyle( 'global',    new OutputFormatterStyle( 'cyan', null, ['bold'] ) );
        $formatter->setStyle( 'const',     new OutputFormatterStyle( 'cyan' ) );
        $formatter->setStyle( 'class',     new OutputFormatterStyle( 'blue', null, ['underscore'] ) );
        $formatter->setStyle( 'function',  new OutputFormatterStyle( null));
        $formatter->setStyle( 'default',   new OutputFormatterStyle( null));

        // Types
        $formatter->setStyle( 'number',   new OutputFormatterStyle( 'magenta' ) );
        $formatter->setStyle( 'string',   new OutputFormatterStyle( 'green' ) );
        $formatter->setStyle( 'bool',     new OutputFormatterStyle( 'cyan' ) );
        $formatter->setStyle( 'keyword',  new OutputFormatterStyle( 'yellow' ) );
        $formatter->setStyle( 'comment',  new OutputFormatterStyle( 'blue' ) );
        $formatter->setStyle( 'object',   new OutputFormatterStyle( 'blue' ) );
        $formatter->setStyle( 'resource', new OutputFormatterStyle( 'yellow' ) );
    }
}
