export{};

 enum Role {Admin = 111, Teacher = 999, Student =333}
 const roleNumber: Role = Role.Teacher;
 const role2 : Role = 111;

 type RoleAlt = "admin" | "teacher" | "studnet";

 const roleText: RoleAlt = "admin";

 console.log(roleNumber, roleText);