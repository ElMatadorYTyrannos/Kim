const fb_post_id = "pfbid02d8bQ9DEG4jum1QPLuGnyqZPHzxza7zhCv3kCD6RPwVx9VMDuMwEH3CjhA4Gcoj3Kl"

function html_link(url, str, classname = "") {
  return `<a class="${classname}" href="${url}" target="_blank">${str ? str : url}</a>`
}

function fix_html_str(str) {
  return str.replace("\n", "<br/>")
}

function fix_html_str_tag(str, sep = true, tag = "p") {
  const tag_sep = sep ? `</${tag}><${tag}>` : "<br/>"
  return `<${tag}>${str.replace("\n", tag_sep)}</${tag}>`
}

function commenter({ commenter_name, commenter_url }) {
  return `
<cite title="Go to Facebook User Page">
  ${html_link(commenter_url, commenter_name, "fb-commenter")}
</cite>
`
}

function start() {
  function show_data(json) {
    const { comments_full, links: [{ text: special_link }], post_text } = json

    //add_post(post_text, special_link)

    for (let comment of comments_full) {
      add_comment(comment)
    }

    setTimeout(() => {
      $('#fb-comments').masonry({ percentPosition: true })
    }, 0);
  }

  function add_post(post_text, special_link) {
    $("#fb-post")
      .append(fix_html_str_tag(post_text))
      .append(fix_html_str_tag(html_link(special_link), false))
  }

  function add_comment(comment) {
    const comment_html = `
<div class="col-sm-6 col-lg-4 mb-4">
  <div class="card p-3">
    <figure class="p-3 mb-0">
      <blockquote class="blockquote"></blockquote>
      <figcaption class="blockquote-footer mb-0 text-body-secondary"></figcaption>
    </figure>
  </div>
</div>
`

    const new_comment = $(comment_html)
    $("blockquote", new_comment).html(fix_html_str_tag(comment.comment_text, false))
    $("figcaption", new_comment).html(commenter(comment))
    $("#fb-comments").append(new_comment)
  }

  fetch(`./fb/${fb_post_id}.json`)
    .then(response => response.json())
    .then(json => show_data(json))
}

$(start())
