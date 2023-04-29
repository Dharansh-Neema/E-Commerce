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
            $options: "i",
          },
        }
      : {};
    this.base = this.base.find({ ...searchword });
    return this;
  }
  filter() {
    //Craeting copy of bigQ
    const copyQ = { ...this.bigQ };
    // Deleting some of the non-required fileds
    delete copyQ["limit"];
    delete copyQ["page"];
    delete copyQ["search"];

    //Converting the copyQ into string
    const stringCopyQ = JSON.stringify(copyQ);
    stringCopyQ = stringCopyQ.replace(/\b(gte|lte|gt|lt)\b/g, (m) => `$${m}`);

    const jsonofCopyQ = JSON.parse(stringCopyQ);
    this.base = this.base.find(stringCopyQ);
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
