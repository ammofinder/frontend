/* global moment */
/* global localStorage */
/* global DataTable */
/* global $ */

$(document).ready(function () {
  const darkModeSwitch = $('#dark-mode-switch')
  const html = $('html')
  const caliber = $('#caliber')
  const dateFilter = $('#date-filter')
  const availabilityFilter = $('#availability-filter')

  // Initial setup for dark mode on first visit
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode()
    darkModeSwitch.prop('checked', true)
  } else if (localStorage.getItem('darkMode') === 'disabled') {
    disableDarkMode()
    darkModeSwitch.prop('checked', false)
  } else {
    enableDarkMode()
    darkModeSwitch.prop('checked', true)
  }

  // Functions to enable and disable dark mode
  function enableDarkMode () {
    html.attr('data-bs-theme', 'dark')
    html.addClass('dark')
    localStorage.setItem('darkMode', 'enabled')
  }

  function disableDarkMode () {
    html.removeAttr('data-bs-theme')
    html.removeClass('dark')
    localStorage.setItem('darkMode', 'disabled')
  }

  // Darkmode switch operation
  darkModeSwitch.on('change', function () {
    if ($(this).is(':checked')) {
      enableDarkMode()
    } else {
      disableDarkMode()
    }
  })

  // Function for fetching data and filling table
  function fetchData (typ, filterDate, filterAvailability) {
    $.ajax({
      url: '/getData',
      type: 'GET',
      data: { caliber: typ, dateFilter: filterDate, availabilityFilter: filterAvailability },
      success: function (response) {
        $('#produkty-table').DataTable().clear().rows.add(response).draw()
      },
      error: function (err) {
        console.error('Error while fetching data:', err)
      }
    })
  }

  const table = new DataTable('#produkty-table', {
    autoWidth: false,
    language: {
      decimal: ',',
      emptyTable: 'Brak danych',
      info: 'Pokazuje _START_ do _END_ z _TOTAL_ wpisów',
      infoEmpty: 'Pokazuje 0 do 0 z 0 wpisów',
      infoFiltered: '(filtrowane z _MAX_ całkowitych wpisów)',
      thousands: '.',
      lengthMenu: 'Pokaż _MENU_ wpisów',
      loadingRecords: 'Ładowanie...',
      processing: 'Przetwarzanie...',
      search: 'Szukaj:',
      searchPlaceholder: 'Szukaj...',
      zeroRecords: 'Nie znaleziono żadnych pasujących wpisów',
      aria: {
        sortAscending: ': aktywuj, aby sortować kolumnę rosnąco',
        sortDescending: ': aktywuj, aby sortować kolumnę malejąco'
      }
    },
    columns: [
      { data: 'caliber', width: '2%' },
      { data: 'shop', width: '12%' },
      {
        data: 'link',
        width: '2%',
        render: function (data) {
          return '<a href="' + data + '" role="button" class="btn btn-outline-success btn-sm" target="_blank" title="link">Link</a>'
        }
      },
      { data: 'product_name', width: '50%' },
      { data: 'price', width: '8%' },
      {
        data: 'available',
        width: '5%',
        render: function (data) {
          if (data.toLowerCase() === 'nie') {
            return '<span style="color: red; font-weight: bold;">' + data + '</span>'
          } else if (data.toLowerCase() === 'tak') {
            return '<span style="color: green; font-weight: bold;">' + data + '</span>'
          } else {
            return data
          }
        }
      },
      {
        data: 'date_updated',
        width: '10%',
        render: function (data) {
          return moment(data).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    ],
    columnDefs: [
      { targets: [0, 1, 2, 4, 5, 6], className: 'text-center' }
    ]
  })

  // Changing date switch when switching to new caliber
  caliber.change(function () {
    if (!dateFilter.is(':checked')) {
      dateFilter.prop('checked', true)
    }
    const filterDate = dateFilter.is(':checked')
    const filterAvailability = availabilityFilter.is(':checked')
    fetchData(caliber.val(), filterDate, filterAvailability)
  })

  // Detecting date filter switching
  dateFilter.change(function () {
    const filterDate = $(this).is(':checked')
    const filterAvailability = availabilityFilter.is(':checked')
    fetchData(caliber.val(), filterDate, filterAvailability)
  })

  // Detecting availability filter switching
  availabilityFilter.change(function () {
    const filterDate = dateFilter.is(':checked')
    const filterAvailability = $(this).is(':checked')
    fetchData(caliber.val(), filterDate, filterAvailability)
  })

  // Initial fetchData on 9x19
  table.clear().draw()
  fetchData('9x19')
})
