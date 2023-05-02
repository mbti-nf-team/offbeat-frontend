import Button from 'components/common/button';

export default function Page() {
  return (
    <div style={{
      padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px',
    }}
    >
      <Button color="highlight" size="medium">
        버튼
      </Button>
      <Button color="highlight" size="medium" isFloating>
        버튼
      </Button>
      <Button color="active" size="medium">
        버튼
      </Button>
      <Button color="attention" size="medium">
        버튼
      </Button>
      <Button color="danger" size="medium" disabled>
        버튼
      </Button>
      <Button color="danger" size="medium" isLoading>
        버튼
      </Button>
      <Button color="positive" size="medium">
        버튼
      </Button>
      <Button color="relate" size="medium">
        버튼
      </Button>
      <Button color="done" size="medium">
        버튼
      </Button>
      <Button color="highlight" size="small">
        버튼
      </Button>
      <Button color="highlight" size="small" disabled>
        버튼
      </Button>
      <Button color="danger" size="small" isLoading>
        버튼
      </Button>
    </div>
  );
}
