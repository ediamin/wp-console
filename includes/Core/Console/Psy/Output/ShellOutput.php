<?php

namespace WPConsole\Core\Console\Psy\Output;

use Psy\Output\ShellOutput as PsyShellOutput;

class ShellOutput extends PsyShellOutput {

    /**
     * Output message
     *
     * @since WP_CONSOLE_SINCE
     *
     * @var string
     */
    public $outputMessage = null;

    /**
     * Writes a message to the output.
     *
     * @since WP_CONSOLE_SINCE
     *
     * @param string $message A message to write to the output
     * @param bool   $newline Whether to add a newline or not
     *
     * @return void
     */
    public function doWrite( $message, $newline ) {
        $this->outputMessage = $message;
    }
}
