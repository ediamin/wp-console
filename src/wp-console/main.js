wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( WPConsole.rest.root ) );

wp.apiFetch( {
    path: '/' + WPConsole.rest.namespace + '/console',
    method: 'post',
    data: {
        input: '$a = [1,2,3]; $b = [9,4]; dump(array_merge($a, $b))'
    }
} ).then((response) => {
    console.log(response);
});
