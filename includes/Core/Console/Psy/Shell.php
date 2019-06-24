<?php

namespace WPConsole\Core\Console\Psy;

use Psy\Configuration;
use Psy\Exception\ErrorException;
use Psy\Shell as PsyShell;

class Shell extends PsyShell {

    /**
     * Return value indicator override
     *
     * @since 1.0.0
     *
     * @var string
     */
    const RETVAL = '';

    /**
     * Shell Configuration
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var \Psy\Configuration
     */
    private $config;

    /**
     * Create a new Psy Shell.
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param \Psy\Configuration|null $config
     *
     * @return void
     */
    public function __construct( Configuration $config = null ) {
        $this->config = $config;
        parent::__construct( $config );
    }

    /**
     * Helper for throwing an ErrorException.
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param int    $errno   Error type
     * @param string $errstr  Message
     * @param string $errfile Filename
     * @param int    $errline Line number
     *
     * @return void
     */
    public function handleError( $errno, $errstr, $errfile, $errline ) {
        $this->config->getOutput()->exception = new ErrorException( $errstr, 0, $errno, 'console editor', $errline + 1 );
    }
}
