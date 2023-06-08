//base - product.find()
//bigQ - long string
//TODO: Regex in js (to learn)
class WhereCLause {
  constructor(base, bigQ) {
    this.base = base;
    this.bigQ = bigQ;
  }
  search() {
    const searchword = this.bigQ.search
      ? {
          name: {
            $regex: this.bigQ.search,
            $options: "i", // i is for case-insenstive search
            // g is for global search
          },
        }
      : {};
    this.base = this.base.find({ ...searchword });
    return this;
  }
  filter() {
    //Creating copy of bigQ
    const copyQ = { ...this.bigQ };
    // Deleting some of the non-required fileds
    delete copyQ["limit"];
    delete copyQ["page"];
    delete copyQ["search"];

    //Converting the copyQ into string
    let stringCopyQ = JSON.stringify(copyQ);
    stringCopyQ = stringCopyQ.replace(/\b(gte|lte|gt|lt)\b/g, (m) => `$${m}`);

    const jsonofCopyQ = JSON.parse(stringCopyQ);
    this.base = this.base.find(jsonofCopyQ);
    return this;
  }
  Pager(resultPerPage) {
    let currentPage = 1;
    if (this.bigQ.page) {
      currentPage = this.bigQ.page;
    }
    //IMP formula for skipping the values or skipping the pages
    let skipVal = resultPerPage * (currentPage - 1);
    this.base = this.base.limit(resultPerPage).skip(skipVal);
    return this;
  }
}
module.exports = WhereCLause;
