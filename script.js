function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';
  
    const uuid = s.join('');
    return uuid;
  }
  
  class Contact {
    constructor(firstName, surname, tel, address) {
      this.guid = createUUID();
      this.initials = firstName[0].toUpperCase() + surname[0].toUpperCase();
      this.firstName = firstName;
      this.surname = surname;
      this.tel = tel;
      this.address = address;
    }
  }
  
  const personData = [
    {
      guid: 'a4db0e7f-838a-495c-ac87-849ce77a0b14',
      initials: 'SC',
      firstName: 'Simran',
      surname: 'Chand',
      tel: '889034562123',
      address: 'Flat 1, Knightsbridge Lane, London, W57DU',
    },
    {
      guid: '1e3a909c-3e24-4808-a421-d10e73c0d38a',
      initials: 'AG',
      firstName: 'Ankita',
      surname: 'Giri',
      tel: '01234567845',
      address: 'Flat 2, 33 Great Street, London, E195TU',
    },
    {
      guid: '403c9edf-cc54-427d-89cc-787ff3850f76',
      initials: 'MS',
      firstName: 'Manisha',
      surname: 'Sharma',
      tel: '09876543212',
      address: '72 Everglade Terrace, Nottingham, NR43PW',
    },
    {
      guid: 'f6a7b0ef-3a10-4d84-8ecb-1d25c6d95085',
      initials: 'AK',
      firstName: 'Aditya',
      surname: 'Kundu',
      tel: '07994857483',
      address: '320 Andle Road, Inverness, Scotland, IN258DU',
    },
    {
      guid: '3b6c9d17-6b00-47c4-b034-dc759d2c74e0',
      initials: 'JA',
      firstName: 'Jeet',
      surname: 'Acharya',
      tel: '07006875643',
      address: 'Sugary House, 10 Bashem Candies, DentistRow, DE91DW',
    },
  ];
  
  function contactCount() {
    const contactNum = personData.length;
    // console.log(`Number of contacts is ${contactNum}`);
    $('#contactCount').html(`Number of contacts: ${contactNum}`);
  }
  
  function sortTable() {
    personData.sort(function(a, b) {
      const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
      const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }
  
  function requiredForms() {
    $('#firstNameInput')
      .css('border-color', 'red')
      .attr('placeholder', 'Required input...')
      .val('');
    $('#surnameInput')
      .css('border-color', 'red')
      .attr('placeholder', 'Required input...')
      .val('');
    $('#telInput')
      .css('border-color', 'red')
      .attr('placeholder', 'Required input...')
      .val('');
    $('#addressInput')
      .attr('placeholder', 'Optional input...')
      .val('');
  }
  
  function clearForms() {
    $('#firstNameInput')
      .css('border-color', '')
      .attr('placeholder', 'type text here...')
      .val('');
    $('#surnameInput')
      .css('border-color', '')
      .attr('placeholder', 'type text here...')
      .val('');
    $('#telInput')
      .css('border-color', '')
      .attr('placeholder', 'type text here...')
      .val('');
    $('#addressInput')
      .attr('placeholder', 'type text here...')
      .val('');
    $('#editForm')
      .attr('placeholder', 'type text here...')
      .val('');
  }
  
  function addContact(firstName, surname, tel, address) {
    // console.log(firstName, surname, tel, address);
    const newContact = new Contact(firstName, surname, tel, address);
    // console.log(newContact);
    personData.unshift(newContact);
    loadTableData(personData);
  }
  
  // 'add contact' button listener
  function addContactButtonListener() {
    $('#addContactButton').on('click', function(event) {
      event.preventDefault();
      // console.log('addContact button clicked');
      const $firstName = $('#firstNameInput').val();
      const $surname = $('#surnameInput').val();
      const $tel = $('#telInput').val();
      const $address = $('#addressInput').val();
      // console.log(`${$firstName} ${$surname} ${$tel} ${$address}`);
      if ($firstName === '' || $surname === '' || $tel === '') {
        requiredForms();
      } else {
        addContact($firstName, $surname, $tel, $address);
        clearForms();
      }
    });
  }
  
  function editContact(firstName, surname, tel, address, editGuid) {
    // console.log(
    //   `deets within editContact ${firstName} ${surname} ${tel} ${address} ${editGuid}`
    // );
    const target = personData.findIndex(element => element.guid === editGuid);
    // console.log(`target is ${target}`);
    personData[target].firstName = firstName;
    personData[target].surname = surname;
    personData[target].tel = tel;
    personData[target].address = address;
  }
  
  // 'editContact' button listener
  function addEditContactButtonListener() {
    $('#editContactButton').on('click', function(event) {
      event.preventDefault();
      // console.log('editContact button clicked');
      $('#addContactButton').css('display', 'inline-block');
      $('#editContactButton').css('display', 'none');
      const $firstName = $('#firstNameInput').val();
      const $surname = $('#surnameInput').val();
      const $tel = $('#telInput').val();
      const $address = $('#addressInput').val();
      const $editGuid = $('#editForm').val();
      // console.log(
      //   `deets from listener ${$firstName} ${$surname} ${$tel} ${$address} ${$editGuid}`
      // );
      editContact($firstName, $surname, $tel, $address, $editGuid);
      loadTableData(personData);
      clearForms();
    });
  }
  
  function delContact(delGuid) {
    const target = personData.findIndex(element => element.guid === delGuid);
    // console.log(`target is ${target}`);
    personData.splice(target, 1);
    loadTableData(personData);
  }
  
  // 'delete' button listener
  function addDeleteButtonListener() {
    $('button.deleteButton').on('click', function(event) {
      event.preventDefault();
      // console.log('delete button clicked');
      const delGuid = event.target.id;
      // console.log(`delGuid = ${delGuid}`);
      delContact(delGuid);
    });
  }
  
  function editContactFields(editGuid) {
    // console.log(`edit Guid is ${editGuid}`);
    const target = personData.findIndex(element => element.guid === editGuid);
    // console.log(`target is ${target}`);
    // console.log(personData[target]);
    $('#addContactButton').css('display', 'none');
    $('#editContactButton').css({ display: 'inline-block', color: 'blue' });
    $('#firstNameInput')
      .val(personData[target].firstName)
      .css('color', 'blue')
      .focus();
    $('#surnameInput')
      .val(personData[target].surname)
      .css('color', 'blue');
    $('#telInput')
      .val(personData[target].tel)
      .css('color', 'blue');
    $('#addressInput')
      .val(personData[target].address)
      .css('color', 'blue');
    $('#editForm').val(personData[target].guid);
  }
  
  // 'edit' button listener
  function addEditButtonListener() {
    $('button.editButton').on('click', function(event) {
      event.preventDefault();
      // console.log('edit button clicked');
      const editGuid = event.target.id;
      // console.log(`editGuid = ${editGuid}`);
      editContactFields(editGuid);
    });
  }
  
  function loadTableData() {
    const tableBody = $('#tableData');
    let $dataHTML = '';
    for (const person of personData) {
      $dataHTML += `<tr><td class="firstCol"><p class="initial">${person.initials}</p></td><td>${person.firstName}</td><td>${person.surname}</td><td>${person.tel}</td><td>${person.address}</td><td><button class="editButton" id="${person.guid}">edit</button></td><td class="lastCol"><button class="deleteButton" id="${person.guid}">delete</button></td></tr>`;
    }
    tableBody.html($dataHTML);
    addDeleteButtonListener();
    addEditButtonListener();
    contactCount();
  }
  
  // 'search' form listener *need better understanding*
  $('#search').on('keyup', function() {
    const $value = $(this)
      .val()
      .toLowerCase();
    $('#tableData tr').filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf($value) > -1
      );
    });
  });
  
  sortTable();
  loadTableData(personData);
  addContactButtonListener();
  addEditContactButtonListener();
  contactCount();