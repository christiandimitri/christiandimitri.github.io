# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "theme"
  spec.version       = "0.1.0"
  spec.authors       = ["Christian Dimitri"]
  spec.email         = ["christian.j.dimitrii@gmail.com"]
  
  spec.summary       = "Write a short summary, because Rubygems requires one."
  spec.homepage      = "http://chrisdimi.me"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.0"

  spec.add_development_dependency "bundler", "~> 2.1.4"
  spec.add_development_dependency "rake", "~> 12.0"
end
