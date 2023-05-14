// Checking if user is TEACHER
const isTeacher = (req, res, next) => {
    if (req.user && req.user.userType === 'TEACHER') {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
  
  // Checking if user is ADMIN
  const isAdmin = (req, res, next) => {
    if (req.user.userType === 'ADMIN') {
      next();
    } else {
      return res.status(403).json({
        message: 'Only Admins can Delete Questions'
      });
    }
  };
  
  // Checking if user is STUDENT
  const isNotStudent = (req, res, next) => {
    if (req.user.userType !== 'STUDENT') {
      next();
    } else {
      return res.status(403).json({
        message: "Students aren't allowed to view this content"
      });
    }
  };
  
  module.exports = { isTeacher, isAdmin, isNotStudent };
  