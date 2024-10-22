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
        language: {
            decimal: ",",
            emptyTable: "Brak danych",
            info: "Pokazuje _START_ do _END_ z _TOTAL_ wpisów",
            infoEmpty: "Pokazuje 0 do 0 z 0 wpisów",
            infoFiltered: "(filtrowane z _MAX_ całkowitych wpisów)",
            infoPostFix: "",
            thousands: ".",
            lengthMenu: "Pokaż _MENU_ wpisów",
            loadingRecords: "Ładowanie...",
            processing: "Przetwarzanie...",
            search: "Szukaj:",
            searchPlaceholder: "Szukaj...",
            zeroRecords: "Nie znaleziono żadnych pasujących wpisów",
            paginate: {
                first: "Pierwsza",
                last: "Ostatnia",
                next: "Następna",
                previous: "Poprzednia"
            },
            aria: {
                sortAscending: ": aktywuj, aby sortować kolumnę rosnąco",
                sortDescending: ": aktywuj, aby sortować kolumnę malejąco"
            }
        },
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
