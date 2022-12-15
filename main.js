$(document).ready(function () {
    $("#konversi").click(function () {
        $("#konversi").addClass("active")
        $("#home").removeClass("active")
        $("#listm").removeClass("active")
        $("#valas").removeClass("active")

        $("#page2").removeClass("d-none")
        $("#index").addClass("d-none")
        $("#page3").addClass("d-none")
        $("#list").addClass("d-none")
    })

    $("#home").click(function () {
        $("#home").addClass("active")
        $("#konversi").removeClass("active")
        $("#listm").removeClass("active")
        $("#valas").removeClass("active")

        $("#index").removeClass("d-none")
        $("#page2").addClass("d-none")
        $("#page3").addClass("d-none")
        $("#list").addClass("d-none")
    })

    $("#listm").click(function () {
        $("#listm").addClass("active")
        $("#home").removeClass("active")
        $("#konversi").removeClass("active")
        $("#valas").removeClass("active")

        $("#list").removeClass("d-none")
        $("#page3").addClass("d-none")
        $("#page2").addClass("d-none")
        $("#index").addClass("d-none")
    })
    
    $("#valas").click(function () {
        $("#valas").addClass("active")
        $("#home").removeClass("active")
        $("#listm").removeClass("active")
        $("#konversi").removeClass("active")

        $("#page3").removeClass("d-none")
        $("#list").addClass("d-none")
        $("#page2").addClass("d-none")
        $("#index").addClass("d-none")
    })

    $("#submit-konversi").click(function () {
        konversi()
    })

    // $("#validationCustom02").change(function () {
    //     nilai = $("#validationCustom02").val()
    //     var nilai = data.result.toLocaleString('en-US')
    // })

    list();
})

function konversi() {
    to = $("#validationCustom03").val();
    from = $("#validationCustom01").val();
    amount = $("#validationCustom02").val();
    $('#spinner-div').show()
    $.ajax({
		url: "https://api.apilayer.com/exchangerates_data/convert?to=" + to + "&from=" + from + "&amount=" + amount,
		headers: {
			"apikey": "yDFEskufVqZl9BbMeciqkSsEoGxwaAkD"
		},
		type: "GET",
		contentType: "application/json",
		dataType: 'json',
		success: function (data, textStatus, jqXHR) {
            var usFormat = data.result.toLocaleString('en-US')
            $("#validationCustom04").val(usFormat);
            $('#spinner-div').hide();
		},
		error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR", jqXHR.responseJSON.processStatus)
            errorHandler(jqXHR);
		}
	});


    // fetch("https://api.apilayer.com/exchangerates_data/convert?to=" + to + "&from=" + from + "&amount=" + amount , requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

}

function list() {
    $.ajax({
		url: "https://api.apilayer.com/exchangerates_data/symbols",
		headers: {
			"apikey": "yDFEskufVqZl9BbMeciqkSsEoGxwaAkD"
		},
		type: "GET",
		contentType: "application/json",
		dataType: 'json',
		success: function (data, textStatus, jqXHR) {
            i=1;
            $.each(data.symbols, function (k, v) {
                $('#body-list').append('<tr><td>'+i+'</td><td>'+v+'</td><td>'+k+'</td></tr>');
                i++;
            })

            $('#list-table').DataTable();
		},
		error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR", jqXHR.responseJSON.processStatus)
            errorHandler(jqXHR);
		}
	});

    // fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}
