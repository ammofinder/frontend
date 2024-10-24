$(document).ready(function() {
    function fetchData(typ, filterDate) {
        $.ajax({
            url: 'static/getData.php',
            type: 'GET',
            data: { caliber: typ , dateFilter: filterDate},
            success: function(response) {
                let data = JSON.parse(response);
                $('#produktyTable').DataTable().clear().rows.add(data).draw();
            }
        });
    }

    $('#produktyTable').DataTable({
        autoWidth: false, 
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
            { data: 'caliber', width: '2%' },
            { data: 'shop', width: '8%' },
            { data: 'link', width: '2%', render: function(data) {
                return '<a href="' + data + '" role="button" class="btn btn-outline-success btn-sm" target="_blank" title="link">Link</a>';
            }},
            { data: 'product_name', width: '50%' },
            { data: 'price', width: '7%' },
            { data: 'available', width: '5%', render: function(data) {
                if (data.toLowerCase() === 'nie') {
                    return '<span style="color: red; font-weight: bold;">' + data + '</span>';
                } else if (data.toLowerCase() === 'tak') {
                    return '<span style="color: green; font-weight: bold;">' + data + '</span>';
                } else {
                    return data;
                }
            }},
            { data: 'date_updated', width: '8%' }
        ],
        columnDefs: [
            { targets: [0, 1, 2, 4, 5], className: 'text-center' }
        ]
    });

    $('#caliber').change(function() {
        // While changing caliber, set checkbox to true automatically
        if (!$('#dateFilter').is(':checked')) {
            $('#dateFilter').prop('checked', true);
        }
        let filterDate = $('#dateFilter').is(':checked');
        fetchData($('#caliber').val(), filterDate);
    });

    // If ONLY checkbox is changed
    $('#dateFilter').change(function() {
        let filterDate = $(this).is(':checked');
        fetchData($('#caliber').val(), filterDate);
    });

    // Initial load
    fetchData('9x19');
});