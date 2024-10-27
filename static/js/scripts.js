$(document).ready(function() {
    let darkModeSwitch = $('#darkModeSwitch');
    let html = $('html');

    // Initial setup for dark mode on first visit
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeSwitch.prop('checked', true);
    } else if (localStorage.getItem('darkMode') === 'disabled') {
        disableDarkMode();
        darkModeSwitch.prop('checked', false);
    } else {
        enableDarkMode();
        darkModeSwitch.prop('checked', true);
    }

    // Functions to enable and disable dark mode
    function enableDarkMode() {
        html.attr('data-bs-theme', 'dark');
        html.addClass('dark');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        html.removeAttr('data-bs-theme');
        html.removeClass('dark');
        localStorage.setItem('darkMode', 'disabled');
    }

    // Darkmode switch operation
    darkModeSwitch.on('change', function() {
        if ($(this).is(':checked')) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    // Function for fetching data and filling table
    function fetchData(typ, filterDate) {
        $.ajax({
            url: '/getData',
            type: 'GET',
            data: { caliber: typ , dateFilter: filterDate},
            success: function(response) {
                $('#produktyTable').DataTable().clear().rows.add(response).draw();
            },
            error: function(err) {
                console.error('Error while fetching data:', err);
            }
        });
    }

    let table = new DataTable('#produktyTable', {
        autoWidth: false,
        language: {
            decimal: ",",
            emptyTable: "Brak danych",
            info: "Pokazuje _START_ do _END_ z _TOTAL_ wpisów",
            infoEmpty: "Pokazuje 0 do 0 z 0 wpisów",
            infoFiltered: "(filtrowane z _MAX_ całkowitych wpisów)",
            thousands: ".",
            lengthMenu: "Pokaż _MENU_ wpisów",
            loadingRecords: "Ładowanie...",
            processing: "Przetwarzanie...",
            search: "Szukaj:",
            searchPlaceholder: "Szukaj...",
            zeroRecords: "Nie znaleziono żadnych pasujących wpisów",
            aria: {
                sortAscending: ": aktywuj, aby sortować kolumnę rosnąco",
                sortDescending: ": aktywuj, aby sortować kolumnę malejąco"
            }
        },
        columns: [
            { data: 'caliber', width: '2%' },
            { data: 'shop', width: '8%' },
            { data: 'link', width: '2%',
                render: function(data) {
                    return '<a href="' + data + '" role="button" class="btn btn-outline-success btn-sm" target="_blank" title="link">Link</a>';
                }
            },
            { data: 'product_name', width: '50%' },
            { data: 'price', width: '9%' },
            { data: 'available', width: '5%',
                render: function(data) {
                    if (data.toLowerCase() === 'nie') {
                        return '<span style="color: red; font-weight: bold;">' + data + '</span>';
                    } else if (data.toLowerCase() === 'tak') {
                        return '<span style="color: green; font-weight: bold;">' + data + '</span>';
                    } else {
                        return data;
                    }
                }
            },
            { data: 'date_updated', width: '8%',
                render: function(data) {
                    return moment(data).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        ],
        columnDefs: [
            { targets: [0, 1, 2, 4, 5], className: 'text-center' }
        ]
    });

    // Changing date switch when switching to new caliber
    let dateFilter = $('#dateFilter');
    $('#caliber').change(function() {
        if (!dateFilter.is(':checked')) {
            $('#dateFilter').prop('checked', true);
        }
        let filterDate = dateFilter.is(':checked');
        fetchData($('#caliber').val(), filterDate);
    });

    dateFilter.change(function() {
        let filterDate = $(this).is(':checked');
        fetchData($('#caliber').val(), filterDate);
    });

    // Initial fetchData on 9x19
    fetchData('9x19');
});