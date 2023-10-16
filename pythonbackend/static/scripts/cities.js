var state_arr = new Array("Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle");

var s_a = new Array();
s_a[0] = "";
s_a[1] = "Colombo | Dehiwala | Moratuwa";
s_a[2] = "Gampaha | Negombo | Wattala";
s_a[3] = "Kalutara | Panadura | Horana";
s_a[4] = "Kandy | Peradeniya | Gampola";
s_a[5] = "Matale | Dambulla | Sigiriya";
s_a[6] = "Nuwara Eliya | Hatton | Talawakele";
s_a[7] = "Galle | Hikkaduwa | Ambalangoda";
s_a[8] = "Matara | Weligama | Mirissa";
s_a[9] = "Hambantota | Tangalle | Ambalantota";
s_a[10] = "Jaffna | Point Pedro | Chavakachcheri";
s_a[11] = "Kilinochchi";
s_a[12] = "Mannar";
s_a[13] = "Vavuniya";
s_a[14] = "Mullaitivu";
s_a[15] = "Batticaloa | Kattankudy | Valaichchenai";
s_a[16] = "Ampara | Kalmunai | Akkaraipattu";
s_a[17] = "Trincomalee | Kinniya";
s_a[18] = "Kurunegala | Kuliyapitiya | Nikaweratiya";
s_a[19] = "Puttalam | Chilaw";
s_a[20] = "Anuradhapura | Medawachchiya";
s_a[21] = "Polonnaruwa";
s_a[22] = "Badulla | Bandarawela | Haputale";
s_a[23] = "Monaragala";
s_a[24] = "Ratnapura | Balangoda | Embilipitiya";
s_a[25] = "Kegalle  | Mawanella | Rambukkana";

function print_state(state_id) {
    // given the id of the <select> tag as function argument, it inserts <option> tags
    var option_str = document.getElementById(state_id);
    option_str.length = 0;
    option_str.options[0] = new Option('Select Your District', '');
    option_str.selectedIndex = 0;
    for (var i = 0; i < state_arr.length; i++) {
        option_str.options[option_str.length] = new Option(state_arr[i], state_arr[i]);
    }
}

function print_city(city_id, city_index) {
    var option_str = document.getElementById(city_id);
    option_str.length = 0; // Fixed by Julian Woods
    option_str.options[0] = new Option('Select Your City', '');
    option_str.selectedIndex = 0;
    var city_arr = s_a[city_index].split("|");
    for (var i = 0; i < city_arr.length; i++) {
        option_str.options[option_str.length] = new Option(city_arr[i], city_arr[i]);
    }
}