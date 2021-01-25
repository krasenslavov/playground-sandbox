const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Gets all Members
router.get("/", (req, res) => {
  res.json(members);
});

// Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(
      members.filter((members) => members.id === parseInt(req.params.id))
    );
  } else {
    res.status(400).json({ msg: `No member with the id ${req.params.id}` });
  }
});

// Create a Member
router.post("/", (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: `Please enter name and email` });
    return;
  }

  members.push(newMember);
  res.json(members);
  // res.redirect("/"); // used for Add Member form
});

// Update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updatedMember = req.body;
    console.log(updatedMember);
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;
        res.json({ msg: `Member was updated`, member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id ${req.params.id}` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: `Member deleted`,
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No member with the id ${req.params.id}` });
  }
});
module.exports = router;
