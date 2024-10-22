$(document).ready(function() {
    function fetchData(typ) {
        $.ajax({
            url: 'static/getData.php',
            type: 'GET',
            data: { caliber: typ },
            success: function(response) {
                let data = JSON.parse(response);
                $('#produktyTable').DataTable().clear().rows.add(data).draw();
            }
        });
    }

    $('#produktyTable').DataTable({
        autoWidth: true, 
        columns: [
            { data: 'caliber' },
            { data: 'shop' },
            { data: 'link', render: function(data) {
                return '<a href="' + data + '" role="button" class="btn btn-outline-success btn-sm" target="_blank" title="link">Link</a>';
            }},
            { data: 'product_name' },
            { data: 'price' },
            { data: 'date_updated' }
        ]
    });

    $('#caliber').change(function() {
        fetchData($(this).val());
    });

    // Initial load
    fetchData('9x19');
});
