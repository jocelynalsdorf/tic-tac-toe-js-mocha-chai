describe('Contact', function() {
  it("creates a new contact with the given specifications", function(){
    var testContact = new Contact("rita", "moreno");
    expect(testContact.firstName).to.equal("rita");
    expect(testContact.lastName).to.equal("moreno");
    expect(testContact.addresses).to.eql([]);
  });

  it("creates a full name on a contact ", function(){
    var testContact = new Contact("rita", "moreno");
    expect(testContact.fullName()).to.equal("rita moreno");
  });
  

});

