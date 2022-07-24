import CopyOutputDeprecated from './CopyOutputDeprecated';
import CopyOutput from './CopyOutput';

const CopyOutputButton = wpConsole.wp_version.gte_5_8
    ? CopyOutput
    : CopyOutputDeprecated;

export default CopyOutputButton;
