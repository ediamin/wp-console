import './style.scss';

const title = 'WP Console';

ReactDOM.render(
  <div className="wp-console-inner">
    <h4>{title}</h4>
  </div>,
  document.getElementById('wp-console')
);

$('.ab-item', '#wp-admin-bar-wp-console').on('click', (e) => {
    e.preventDefault();
    $('#wp-console').addClass('active');
});
